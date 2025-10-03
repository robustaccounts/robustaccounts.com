'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { ADMIN_AUTH_COOKIE, isCookieAuthorized } from '@/lib/admin-auth';
import {
    AdminBlogPostDetail,
    BlogPostInput,
    createAdminBlogPost,
    getAdminBlogPostById,
    softDeleteAdminBlogPost,
    updateAdminBlogPost,
} from '@/lib/blog-admin';

const CMS_PATH = '/admin/blog/cms';

type ActionSuccess<T> = { success: true; data: T };
type ActionFailure = { success: false; error: string };
export type ActionResponse<T> = ActionSuccess<T> | ActionFailure;

async function requireAdmin() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

    if (!isCookieAuthorized(authCookie)) {
        throw new Error('Unauthorized');
    }
}

export async function fetchBlogPostForEdit(
    id: string,
): Promise<ActionResponse<AdminBlogPostDetail>> {
    try {
        await requireAdmin();

        const post = await getAdminBlogPostById(id);

        if (!post) {
            return { success: false, error: 'Blog post not found.' };
        }

        return { success: true, data: post };
    } catch (error) {
        console.error('Failed to fetch blog post', error);
        return { success: false, error: 'Unable to load blog post.' };
    }
}

export async function createBlogPostAction(
    input: BlogPostInput,
): Promise<ActionResponse<AdminBlogPostDetail>> {
    try {
        await requireAdmin();

        const post = await createAdminBlogPost(input);
        revalidatePath(CMS_PATH);

        return { success: true, data: post };
    } catch (error) {
        console.error('Failed to create blog post', error);
        return { success: false, error: 'Unable to create blog post.' };
    }
}

export async function updateBlogPostAction(
    input: BlogPostInput,
): Promise<ActionResponse<AdminBlogPostDetail>> {
    try {
        await requireAdmin();

        const post = await updateAdminBlogPost(input);
        revalidatePath(CMS_PATH);

        return { success: true, data: post };
    } catch (error) {
        console.error('Failed to update blog post', error);
        return { success: false, error: 'Unable to update blog post.' };
    }
}

export async function deleteBlogPostAction(
    id: string,
): Promise<ActionResponse<null>> {
    try {
        await requireAdmin();

        await softDeleteAdminBlogPost(id);
        revalidatePath(CMS_PATH);

        return { success: true, data: null };
    } catch (error) {
        console.error('Failed to delete blog post', error);
        return { success: false, error: 'Unable to delete blog post.' };
    }
}
