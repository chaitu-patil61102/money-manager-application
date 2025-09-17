import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="add-btn bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animated-spin" />
                            Deleting...
                        </>
                    ) : (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;
