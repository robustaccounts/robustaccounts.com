import type { Metadata } from 'next';

import { listAdminBlogPosts } from '@/lib/blog-admin';

import { logoutAdmin } from '../../actions';
import CmsClient from './cms-client';

export const metadata: Metadata = {
    title: 'Admin • Blog CMS',
};

export default async function BlogCmsPage() {
    const posts = await listAdminBlogPosts();

    return <CmsClient initialPosts={posts} logoutAction={logoutAdmin} />;
}
