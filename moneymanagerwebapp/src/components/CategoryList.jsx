// import { Layers2, Pencil } from 'lucide-react';
// import React from 'react'

// const CategoryList = ({ categories, onEditCategory }) => {
//     return (
//         <div className="p-4 bg-white rounded-lg shadow">
//             <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-lg font-semibold">Category Sources</h4>
//             </div>

//             {/* Category List */}
//             {categories.length === 0 ? (
//                 <p className="text-gray-500">
//                     No categories added yet. Add some to started!
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {categories.map((category) => (
//                         <div
//                             key={category.id}
//                             className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">

//                             {/* Icon / Emoji display */}
//                             <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
//                                 {category.icon ? (
//                                     <span className="text-2xl">
//                                         <img src={category.icon} alt={category.name} className="w-5 h-5" />
//                                     </span>
//                                 ) : (
//                                     <Layers2 className="text-purple-800" size={24} />
//                                 )}
//                             </div>

//                             {/* Category details */}
//                             <div className="flex-1 flex items-center justify-between">
//                                 {/* Category name and type */}
//                                 <div>
//                                     <p className="text-sm text-gray-700 font-medium">
//                                         {category.name}
//                                     </p>
//                                     <p className="text-sm text-gray-400 mt-1 capitalize">
//                                         {category.type}
//                                     </p>
//                                 </div>

//                                 {/* Action buttons */}
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         onClick={() => onEditCategory(category)}
//                                         className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                                         <Pencil size={18} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CategoryList;


import { Layers2, Pencil, Trash2 } from 'lucide-react';  // ✅ added Trash2

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>

            {categories.length === 0 ? (
                <p className="text-gray-500">
                    No categories added yet. Add some to started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">

                            {/* Icon / Emoji display */}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="w-5 h-5" />
                                    </span>
                                ) : (
                                    <Layers2 className="text-purple-800" size={24} />
                                )}
                            </div>

                            {/* Category details */}
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-2">
                                    {/* Edit */}
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Pencil size={18} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => onDeleteCategory(category.id)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default CategoryList;
