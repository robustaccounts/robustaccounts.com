'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import type {
    AdminBlogPostDetail,
    AdminBlogPostSummary,
    BlogPostInput,
} from '@/lib/blog-admin';

import {
    createBlogPostAction,
    deleteBlogPostAction,
    fetchBlogPostForEdit,
    updateBlogPostAction,
} from './actions';

const RichMdxEditor = dynamic(() => import('./rich-mdx-editor'), {
    ssr: false,
});

interface CmsClientProps {
    initialPosts: AdminBlogPostSummary[];
    logoutAction: () => Promise<void>;
}

type StatusMessage = {
    type: 'success' | 'error';
    text: string;
} | null;

interface FormState {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    displayDate: string;
    author: string;
    featured: boolean;
    tagsInput: string;
    content: string;
}

const EMPTY_FORM: FormState = {
    id: undefined,
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    readTime: '5 min read',
    displayDate: '',
    author: '',
    featured: false,
    tagsInput: '',
    content: '',
};

function toSummary(detail: AdminBlogPostDetail): AdminBlogPostSummary {
    return {
        id: detail.id,
        slug: detail.slug,
        title: detail.title,
        excerpt: detail.excerpt,
        category: detail.category,
        readTime: detail.readTime,
        displayDate: detail.displayDate,
        author: detail.author,
        featured: detail.featured,
        tags: detail.tags,
        publishedAt: detail.publishedAt,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
    };
}

function parseTags(tags: string): string[] {
    return tags
        .split(',')
        .map((tag) => tag.trim())
        .map((tag) => tag.replace(/^#/, ''))
        .filter(Boolean);
}

function tagsToInput(tags: string[]): string {
    return tags.map((tag) => tag.replace(/^#/, '')).join(', ');
}

function sortPosts(posts: AdminBlogPostSummary[]): AdminBlogPostSummary[] {
    return [...posts].sort((a, b) => {
        const dateA = new Date(a.publishedAt ?? a.updatedAt);
        const dateB = new Date(b.publishedAt ?? b.updatedAt);

        const timeA = Number.isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = Number.isNaN(dateB.getTime()) ? 0 : dateB.getTime();

        return timeB - timeA;
    });
}

export default function CmsClient({
    initialPosts,
    logoutAction,
}: CmsClientProps) {
    const [posts, setPosts] = useState<AdminBlogPostSummary[]>(() =>
        sortPosts(initialPosts),
    );
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [status, setStatus] = useState<StatusMessage>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [isEditorActive, setIsEditorActive] = useState(false);

    const hasActivePost = isEditorActive;

    const activeTitle = useMemo(() => {
        if (!hasActivePost) {
            return 'Select or create a post';
        }

        if (form.id) {
            return form.title
                ? `Editing ${form.title}`
                : 'Editing untitled post';
        }

        return 'Create a new post';
    }, [form.id, form.title, hasActivePost]);

    const handleCreateNew = () => {
        setStatus(null);
        setForm({ ...EMPTY_FORM });
        setIsEditorActive(true);
    };

    const handleSelectPost = async (id: string) => {
        setStatus(null);
        setIsLoadingPost(true);

        const response = await fetchBlogPostForEdit(id);

        setIsLoadingPost(false);

        if (!response.success) {
            setStatus({ type: 'error', text: response.error });
            return;
        }

        const post = response.data;

        setForm({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            category: post.category,
            readTime: post.readTime,
            displayDate: post.displayDate,
            author: post.author,
            featured: post.featured,
            tagsInput: tagsToInput(post.tags),
            content: post.content,
        });

        setIsEditorActive(true);
    };

    const handleInputChange = (
        field: keyof FormState,
        value: string | boolean,
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCancelEditing = () => {
        setIsEditorActive(false);
        setForm({ ...EMPTY_FORM });
        setStatus(null);
    };

    const handleDelete = async () => {
        if (!form.id) {
            return;
        }

        const confirmed = window.confirm('Soft-delete this blog post?');
        if (!confirmed) {
            return;
        }

        setIsSubmitting(true);
        const result = await deleteBlogPostAction(form.id);
        setIsSubmitting(false);

        if (!result.success) {
            setStatus({ type: 'error', text: result.error });
            return;
        }

        setPosts((prev) => prev.filter((post) => post.id !== form.id));
        setStatus({ type: 'success', text: 'Post deleted.' });
        handleCancelEditing();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedTitle = form.title.trim();
        const trimmedExcerpt = form.excerpt.trim();
        const trimmedCategory = form.category.trim();

        if (!trimmedTitle || !trimmedExcerpt || !trimmedCategory) {
            setStatus({
                type: 'error',
                text: 'Title, excerpt, and category are required.',
            });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        const payload: BlogPostInput = {
            id: form.id,
            title: trimmedTitle,
            slug: form.slug.trim() || undefined,
            excerpt: trimmedExcerpt,
            category: trimmedCategory,
            readTime: form.readTime.trim() || '5 min read',
            displayDate: form.displayDate.trim(),
            author: form.author.trim() || 'Robust Accounts Team',
            featured: form.featured,
            tags: parseTags(form.tagsInput),
            content: form.content,
        };

        const result = form.id
            ? await updateBlogPostAction(payload)
            : await createBlogPostAction(payload);

        setIsSubmitting(false);

        if (!result.success) {
            setStatus({ type: 'error', text: result.error });
            return;
        }

        const detail = result.data;
        const summary = toSummary(detail);

        setPosts((prev) => {
            const next = form.id
                ? prev.map((post) => (post.id === summary.id ? summary : post))
                : [summary, ...prev];
            return sortPosts(next);
        });

        setForm({
            id: detail.id,
            title: detail.title,
            slug: detail.slug,
            excerpt: detail.excerpt,
            category: detail.category,
            readTime: detail.readTime,
            displayDate: detail.displayDate,
            author: detail.author,
            featured: detail.featured,
            tagsInput: tagsToInput(detail.tags),
            content: detail.content,
        });

        setStatus({
            type: 'success',
            text: form.id
                ? 'Post updated successfully.'
                : 'Post created successfully.',
        });
        setIsEditorActive(true);
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
            {/* Header */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 p-2">
                                <svg
                                    className="h-6 w-6 text-accent"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Blog CMS
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            Create, edit, and manage your blog articles with
                            ease
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={handleCreateNew}
                            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            New Post
                        </button>
                        <form action={logoutAction}>
                            <button
                                type="submit"
                                className="rounded-xl border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
                            >
                                Log Out
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                {/* Sidebar - Posts List */}
                <aside className="h-fit rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-6">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-4">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-5 w-5 text-accent"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            <h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
                                All Posts ({posts.length})
                            </h2>
                        </div>
                    </div>
                    <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
                        {posts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                                <div className="mb-3 rounded-full bg-gray-100 p-3">
                                    <svg
                                        className="h-8 w-8 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-700">
                                    No posts yet
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Create your first article to get started
                                </p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <button
                                    key={post.id}
                                    type="button"
                                    onClick={() => handleSelectPost(post.id)}
                                    className={`group w-full border-b border-gray-100 px-5 py-4 text-left transition-all hover:bg-gray-50 ${
                                        form.id === post.id
                                            ? 'bg-accent/5 hover:bg-accent/10'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <h3
                                            className={`line-clamp-2 text-sm font-semibold ${
                                                form.id === post.id
                                                    ? 'text-accent'
                                                    : 'text-gray-900 group-hover:text-accent'
                                            }`}
                                        >
                                            {post.title || 'Untitled post'}
                                        </h3>
                                        {form.id === post.id && (
                                            <svg
                                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-gray-500">
                                        /{post.slug}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium">
                                            {post.category || 'Uncategorized'}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {post.displayDate || 'No date'}
                                        </span>
                                    </div>
                                    {post.featured && (
                                        <div className="mt-2">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                                                <svg
                                                    className="h-3 w-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                {/* Main Editor Section */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {isLoadingPost ? (
                        <div className="flex items-center justify-center p-12">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-accent"></div>
                                <p className="text-sm font-medium text-gray-600">
                                    Loading post...
                                </p>
                            </div>
                        </div>
                    ) : hasActivePost ? (
                        <form
                            className="space-y-6 p-6 md:p-8"
                            onSubmit={handleSubmit}
                        >
                            {/* Form Header */}
                            <div className="flex flex-col gap-2 border-b border-gray-200 pb-5">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {activeTitle}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Fill out the form below to create or update
                                    your blog post. Slugs are auto-generated and
                                    tags are comma-separated.
                                </p>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div
                                    className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 ${
                                        status.type === 'success'
                                            ? 'border-emerald-200 bg-emerald-50'
                                            : 'border-red-200 bg-red-50'
                                    }`}
                                >
                                    <svg
                                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                                            status.type === 'success'
                                                ? 'text-emerald-600'
                                                : 'text-red-600'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {status.type === 'success' ? (
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        ) : (
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        )}
                                    </svg>
                                    <p
                                        className={`text-sm font-medium ${
                                            status.type === 'success'
                                                ? 'text-emerald-800'
                                                : 'text-red-800'
                                        }`}
                                    >
                                        {status.text}
                                    </p>
                                </div>
                            )}

                            {/* Form Fields */}
                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Title{' '}
                                        <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.title}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'title',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Enter a compelling title"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Slug
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.slug}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'slug',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="auto-generated-from-title"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Category{' '}
                                        <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.category}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'category',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="e.g., Tax Planning"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Read Time
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.readTime}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'readTime',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="e.g., 8 min read"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Display Date
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.displayDate}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'displayDate',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="e.g., July 29, 2025"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Author
                                    </span>
                                    <input
                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                        value={form.author}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'author',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="e.g., Jane Doe, CPA"
                                    />
                                </label>
                            </div>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                    Excerpt{' '}
                                    <span className="text-red-500">*</span>
                                </span>
                                <textarea
                                    className="min-h-[100px] rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                    value={form.excerpt}
                                    onChange={(event) =>
                                        handleInputChange(
                                            'excerpt',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Write a brief summary that will appear on the blog listing page"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                    Tags
                                </span>
                                <input
                                    className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                                    value={form.tagsInput}
                                    onChange={(event) =>
                                        handleInputChange(
                                            'tagsInput',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="tipped workers, tax planning, business structure"
                                />
                                <span className="text-xs text-gray-500">
                                    Separate tags with commas. Hashtags will be
                                    added automatically.
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={(event) =>
                                        handleInputChange(
                                            'featured',
                                            event.target.checked,
                                        )
                                    }
                                    className="h-5 w-5 rounded-md border-2 border-gray-300 text-accent transition focus:ring-4 focus:ring-accent/20"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-900">
                                        Featured Post
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        Display this post prominently on the
                                        blog landing page
                                    </span>
                                </div>
                            </label>

                            {/* Content Editor */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                                    Content{' '}
                                    <span className="text-red-500">*</span>
                                </span>
                                <div className="overflow-hidden rounded-xl border-2 border-gray-200">
                                    <RichMdxEditor
                                        value={form.content}
                                        onChange={(markdown) =>
                                            handleInputChange(
                                                'content',
                                                markdown,
                                            )
                                        }
                                    />
                                </div>
                                <span className="text-xs text-gray-500">
                                    Use Markdown syntax to format your content.
                                    The editor supports headings, lists, code
                                    blocks, and more.
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {form.id
                                                ? 'Update Post'
                                                : 'Publish Post'}
                                        </>
                                    )}
                                </button>
                                {form.id && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 rounded-xl border-2 border-red-300 bg-white px-6 py-3 text-sm font-bold text-red-600 transition-all hover:border-red-400 hover:bg-red-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        {isSubmitting
                                            ? 'Deleting...'
                                            : 'Delete Post'}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleCancelEditing}
                                    className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
                            {status ? (
                                <div
                                    className={`flex items-start gap-3 rounded-xl border-2 px-6 py-4 ${
                                        status.type === 'success'
                                            ? 'border-emerald-200 bg-emerald-50'
                                            : 'border-red-200 bg-red-50'
                                    }`}
                                >
                                    <svg
                                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                                            status.type === 'success'
                                                ? 'text-emerald-600'
                                                : 'text-red-600'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {status.type === 'success' ? (
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        ) : (
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        )}
                                    </svg>
                                    <p
                                        className={`text-sm font-medium ${
                                            status.type === 'success'
                                                ? 'text-emerald-800'
                                                : 'text-red-800'
                                        }`}
                                    >
                                        {status.text}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 p-6">
                                        <svg
                                            className="h-16 w-16 text-accent"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        No Post Selected
                                    </h2>
                                    <p className="mt-2 max-w-sm text-sm text-gray-600">
                                        Select a post from the sidebar to edit,
                                        or click "New Post" to create a fresh
                                        article
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleCreateNew}
                                        className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Create New Post
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
