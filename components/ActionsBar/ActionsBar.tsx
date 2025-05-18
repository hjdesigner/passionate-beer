'use client'
import { useState } from 'react';
import clsx from 'clsx';

import { Button, FormField, Heading } from "@/components";
import { FormErrors, formValidation } from '@/utils/formValidation';

import styles from './styles.module.css';
import { toSlug } from '@/utils/toSlug';
import { createBeer } from '@/services/beers';

export type FilterParams = {
  brand: string;
  rating: string;
};

type ActionBarTypes = {
  handleFallback: () => void;
  handleFilterFallback: (filters: FilterParams) => void;
}

const ActionBar = ({ handleFallback, handleFilterFallback }: ActionBarTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '2024',
    details: '',
    image: '',
    altImage: '',
    rating: '3',
  });
  const [formFilter, setFormFilter] = useState({
    brand: '',
    rating: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSucess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormFilter((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = formValidation(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return
    }
    setFormErrors({});
    
    const result = await createBeer({
      ...formData,
      user: 1,
      slug: toSlug(formData.name),
    })

    if (result) {
      setFormSuccess(true)
      handleFallback()
    } else {
      setFormError (true)
    }
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilterFallback(formFilter)
  }

  return (
    <>
      <section className={styles.actionBar}>
        <form onSubmit={handleFilterSubmit} className={styles.filter}>
          <FormField
            name="brand"
            type="select"
            value={formFilter.brand}
            onChange={handleChangeFilter}
            options={[
              { label: 'Super Bock', value: 'Super Bock' },
              { label: 'Sagres', value: 'Sagres' },
              { label: 'Colina ', value: 'Colina ' },
              { label: 'Nortada ', value: 'Nortada ' },
            ]}
          />
          <FormField
            name="rating"
            type="select"
            value={formFilter.rating}
            onChange={handleChangeFilter}
            options={[
              { label: 'Rating 1', value: '1' },
              { label: 'Rating 2', value: '2' },
              { label: 'Rating 3', value: '3' },
              { label: 'Rating 4', value: '4' },
              { label: 'Rating 5', value: '5' },
            ]}
          />
          <Button type='submit' disabled={formFilter.brand === '' && formFilter.rating === ''}>Filter</Button>
        </form>
        <Button onClick={() => {
          setFormErrors({});
          setFormSuccess(false);
          setFormError(false);
          setIsOpen(true);
        }}>
          Add new beer
        </Button>
      </section>
      <div className={clsx(styles.actionBarModal, { [styles.open]: isOpen })}>
        <Heading as="h2" size='sm'>Add New Beer</Heading>
        {formSucess ? (
          <div className={styles.formStatus}>
            <p>Beer added successfully!</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        ) : formError ? (
          <div className={styles.formStatus}>
            <p>Something went wrong. Please try again.</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>          
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
            />

            <FormField
              label="Brand"
              name="brand"
              type="select"
              value={formData.brand}
              onChange={handleChange}
              error={formErrors.brand}
              options={[
                { label: 'Super Bock', value: 'Super Bock' },
                { label: 'Sagres', value: 'Sagres' },
                { label: 'Colina ', value: 'Colina ' },
                { label: 'Nortada ', value: 'Nortada ' },
              ]}
            />
          
            <FormField
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              error={formErrors.year}
            />

            <FormField
              label="Details"
              name="details"
              type="textarea"
              value={formData.details}
              onChange={handleChange}
              error={formErrors.details}
            />

            <FormField
              label="URL image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={formErrors.image}
              help='Use a full pixabay url for example: https://cdn.pixabay.com/photo/2023/11/10/23/22/germany-8380168_640.jpg'
            />

            <FormField
              label="Image alt text"
              name="altImage"
              value={formData.altImage}
              onChange={handleChange}
              error={formErrors.altImage}
            />

            <FormField
              label="Rating (1 to 5)"
              name="rating"
              type="number"
              min={1}
              max={5}
              value={formData.rating}
              onChange={handleChange}
              error={formErrors.rating}
            />
            <div className={styles.formAction}>            
              <Button type='submit'>Add new beer</Button>
              <Button variant='default' onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
            
          </form>
        )}
        
      </div>
    </>
  )
}

export default ActionBar;