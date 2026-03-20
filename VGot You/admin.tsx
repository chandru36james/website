
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataStore, BlogPost } from '../lib/data';
import Swal from 'sweetalert2';

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const Admin: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
        title: '',
        slug: '',
        category: 'Strategy',
        excerpt: '',
        content: '',
        imageUrl: '',
        author: 'VGot You',
        publishedDate: new Date().toISOString().split('T')[0],
        readTime: '5 min',
        idCode: 'GEN-01'
    });

    useEffect(() => {
        setBlogs(dataStore.getBlogs());
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPost.title && currentPost.slug) {
            dataStore.saveBlog(currentPost as BlogPost);
            setBlogs(dataStore.getBlogs());
            setIsEditing(false);
            resetForm();
            Swal.fire({
                title: 'Entry Saved',
                text: 'Archive nodes updated successfully.',
                icon: 'success',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    const handleDelete = (slug: string) => {
        Swal.fire({
            title: 'Delete Entry?',
            text: "This will permanently remove the record from local storage.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#27272a',
            confirmButtonText: 'Yes, Purge it!',
            background: '#0a0a0a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                dataStore.deleteBlog(slug);
                setBlogs(dataStore.getBlogs());
            }
        });
    };

    const resetForm = () => {
        setCurrentPost({
            title: '',
            slug: '',
            category: 'Strategy',
            excerpt: '',
            content: '',
            imageUrl: '',
            author: 'VGot You',
            publishedDate: new Date().toISOString().split('T')[0],
            readTime: '5 min',
            idCode: 'GEN-01'
        });
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 font-mono">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-800 pb-8 gap-6">
                    <div>
                        <span className="text-red-600 text-xs tracking-[0.4em] uppercase mb-2 block">System_Administrator</span>
                        <h1 className="text-5xl font-black tracking-tighter uppercase">Command Center</h1>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Active_Journal_Entries</h2>
                    {!isEditing && (
                        <button 
                            onClick={() => { resetForm(); setIsEditing(true); }}
                            className="bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        >
                            + New Entry
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <m.form 
                            key="edit-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSave}
                            className="space-y-6 bg-zinc-950 p-8 border border-zinc-900 mb-12"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Title</label>
                                    <input 
                                        required
                                        className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-red-600 outline-none"
                                        value={currentPost.title}
                                        onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Slug (URL)</label>
                                    <input 
                                        required
                                        className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-red-600 outline-none"
                                        value={currentPost.slug}
                                        onChange={e => setCurrentPost({...currentPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Category</label>
                                    <select 
                                        className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-red-600 outline-none"
                                        value={currentPost.category}
                                        onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                                    >
                                        <option>Strategy</option>
                                        <option>Case Study</option>
                                        <option>Branding</option>
                                        <option>E-commerce</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Image URL</label>
                                    <input 
                                        className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-red-600 outline-none"
                                        value={currentPost.imageUrl}
                                        onChange={e => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Excerpt</label>
                                <textarea 
                                    className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-red-600 outline-none h-20"
                                    value={currentPost.excerpt}
                                    onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Content (HTML)</label>
                                <textarea 
                                    required
                                    className="w-full bg-black border border-zinc-800 p-4 text-sm font-mono focus:border-red-600 outline-none h-96 leading-relaxed"
                                    value={currentPost.content}
                                    onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="submit" className="bg-white text-black px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-zinc-200">Save Entry</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="border border-zinc-800 px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-zinc-900">Cancel</button>
                            </div>
                        </m.form>
                    ) : (
                        <m.div 
                            key="list-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid gap-4"
                        >
                            {blogs.map(blog => (
                                <div key={blog.slug} className="group flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors">
                                    <div className="flex items-center gap-6">
                                        <img src={blog.imageUrl} className="w-16 h-16 object-cover grayscale opacity-50" alt="" />
                                        <div>
                                            <span className="text-[8px] text-red-600 tracking-widest mb-1 block uppercase">{blog.category}</span>
                                            <h3 className="text-xl font-bold tracking-tight">{blog.title}</h3>
                                            <p className="text-[10px] text-zinc-600 uppercase mt-1">/blog/{blog.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => { setCurrentPost(blog); setIsEditing(true); }} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white">Edit</button>
                                        <button onClick={() => handleDelete(blog.slug)} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-red-600">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {blogs.length === 0 && <p className="text-center py-20 text-zinc-700">No content found.</p>}
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Admin;
