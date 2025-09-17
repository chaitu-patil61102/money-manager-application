import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUser';
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading)
            return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) {
                console.log('categories', response.data);
                setCategoryData(response.data);
            }
        }
        catch (error) {
            console.error('Something went wrong. Please try again.', error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    //fetch categorieson component mount
    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    //add category handler
    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        //check if the category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if (isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, { name, type, icon });
            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        }
        catch (error) {
            console.error("Error adding category", error);
            toast.error(error.response?.data?.message || "Failed to add category");
        }
    }

    //edit
    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    //update category hnadler
    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;
        if (!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        if (!id) {
            toast.error("Category Id is missing for update");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        }
        catch (error) {
            console.error("Error updating category", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    }

    // delete category handler
    const handleDeleteCategory = async (categoryId) => {
        if (!categoryId) {
            toast.error("Category Id is missing for delete");
            return;
        }

        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_CATEGORY(categoryId));
            toast.success("Category deleted successfully");
            fetchCategoryDetails();
        } catch (error) {
            console.error("Error deleting category", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to delete category");
        }
    };


    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow hover:bg-green-200">
                        <Plus size={15} className="text-green-700" />
                        Add Category
                    </button>
                </div>

                {/* Category List */}
                {/* <CategoryList categories={categoryData} onEditCategory={handleEditCategory} /> */}
                <CategoryList
                    categories={categoryData}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}   // 🔥 pass delete handler
                />


                {/* Adding Category Model */}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    {/* Category form */}
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>


                {/* Updating Category Model */}
                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>

            </div>
        </Dashboard >
    )
}

export default Category;
