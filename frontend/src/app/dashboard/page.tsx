'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { MyAppHook } from '@/context/app_provider';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface ProductType {
  id?: number;
  title: string;
  description?: string;
  cost?: number;
  file?: string;
  banner_image?: File | null;
}

const initialProduct: ProductType = {
  title: '',
  description: '',
  cost: 0,
  file: '',
  banner_image: null,
};

const Dashboard: React.FC = () => {
  const { authToken, isLoading } = MyAppHook();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProductType>(initialProduct);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  // Page load when authToken is available
  useEffect(() => {
    if (!authToken) {
      router.push('/auth');
      return;
    }
    fetchAllProducts();
  }, [authToken]);

  // On change form inputs
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      /** with file uploading */
      setFormData({
        ...formData,
        banner_image: event.target.files[0],
        file: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      /** without file uploading */
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isEdit) {
        console.log(`data passing to update: ${formData.title}`);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`,
          {
            ...formData,
            _method: 'PUT',
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data.status) {
          toast.success(response.data.message);
          setFormData(initialProduct);
          if (fileRef.current) {
            fileRef.current.value = '';
          }
        }
      }
      fetchAllProducts();
    } catch (error) {
      console.error(`Adding product error: ${error}`);
    }
  };

  // Fetching all products from db
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(`Fetching all products error: ${error}`);
    }
  };

  // Deleting a product
  const handleDeleteProduct = (id: number) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/products/${id}}`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            if (response.data.status) {
              toast.success(response.data.message);
              fetchAllProducts();
            }
          } catch (error) {
            console.error(`Deleting product error: ${error}`);
          }
          //   Swal.fire({
          //     title: 'Deleted!',
          //     text: 'Your file has been deleted.',
          //     icon: 'success',
          //   });
        }
      });
    } catch (error) {
      console.error(`Deleting a product error: ${error}`);
    }
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card p-4'>
            <h4>{isEdit ? 'Edit ' : 'Add '}Product</h4>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-control mb-2'
                name='title'
                placeholder='Title'
                required
                value={formData.title}
                onChange={handleOnChangeEvent}
              />
              <input
                className='form-control mb-2'
                name='description'
                placeholder='Description'
                required
                value={formData.description}
                onChange={handleOnChangeEvent}
              />
              <input
                className='form-control mb-2'
                name='cost'
                placeholder='Cost'
                type='number'
                required
                value={formData.cost}
                onChange={handleOnChangeEvent}
              />
              <div className='mb-2'>
                {formData.file && (
                  <Image
                    src={formData.file}
                    alt='Preview'
                    id='bannerPreview'
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <input
                className='form-control mb-2'
                type='file'
                id='bannerInput'
                ref={fileRef}
                onChange={handleOnChangeEvent}
              />
              <button className='btn btn-primary' type='submit'>
                {isEdit ? 'Update ' : 'Add '}Product
              </button>
            </form>
          </div>
        </div>

        <div className='col-md-6'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Banner</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    {product.banner_image ? (
                      <Image
                        src={product.banner_image}
                        alt='Product'
                        width={50}
                        height={50}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>${product.cost}</td>
                  <td>
                    <button
                      className='btn btn-warning btn-sm me-2'
                      onClick={() => {
                        setIsEdit(true);
                        setFormData({
                          id: product.id,
                          title: product.title,
                          description: product.description,
                          cost: product.cost,
                          file: product.banner_image,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => {
                        handleDeleteProduct(product.id!);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
