import React from 'react';

interface BlogLoadingProps {
    variant?: 'page' | 'article' | 'card';
    className?: string;
}

export default function BlogLoading({ 
    variant = 'page', 
    className = '' 
}: BlogLoadingProps) {
    if (variant === 'article') {
        return (
            <div className={`max-w-4xl mx-auto ${className}`}>
                {/* Article header skeleton */}
                <div className="mb-8 space-y-4">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                {/* Article content skeleton */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`rounded-xl p-5 border border-gray-200 ${className}`}>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-6 w-18 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Default page loading
    return (
        <div className={`w-full ${className}`}>
            {/* Hero section skeleton */}
            <div className="py-12 text-center space-y-6">
                <div className="space-y-4">
                    <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
                
                {/* Stats skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="text-center space-y-2">
                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content skeleton */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar skeleton */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    </div>

                    {/* Articles skeleton */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <BlogLoading key={i} variant="card" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function BlogErrorState({ 
    title = "Unable to Load Content", 
    message = "There was an error loading the blog content. Please try again later.",
    onRetry 
}: {
    title?: string;
    message?: string;
    onRetry?: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
                <div className="mb-4 text-6xl">📚</div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
                <p className="mb-6 text-gray-600">{message}</p>
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="rounded-lg bg-accent px-6 py-3 text-white font-medium hover:bg-primary transition-colors"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export function BlogEmptyState({
    title = "No Articles Found",
    message = "We couldn't find any articles matching your criteria.",
    actionText = "View All Articles",
    onAction
}: {
    title?: string;
    message?: string;
    actionText?: string;
    onAction?: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
                <div className="mb-4 text-6xl">📖</div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
                <p className="mb-6 text-gray-600">{message}</p>
                {onAction && (
                    <button
                        type="button"
                        onClick={onAction}
                        className="rounded-lg bg-accent px-6 py-3 text-white font-medium hover:bg-primary transition-colors"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
}