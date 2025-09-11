import React, { useEffect, useState } from 'react'
import Input from "../components/Input";
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {

    //this component will handle the form for adding a new category
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        }
        else {
            setCategory({ name: "", type: "income", icon: "" })
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ]

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value })
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 flex flex-col gap-3">

            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    type="button"
                    // className="add-btn add-btn-fill"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;
