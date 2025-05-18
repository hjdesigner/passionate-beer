
export type FormState = {
  name: string;
  brand: string;
  year: number | string;
  details: string;
  image: string;
  altImage: string;
  rating: number | string;
};

export type FormErrors = {
  [K in keyof FormState]?: string;
};

export function formValidation(formData: FormState): FormErrors {
  const errors: FormErrors = {};
  const pixabayRegex = /^https:\/\/cdn\.pixabay\.com\/photo\/\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/[\w-]+_\d+\.jpg$/;

  if (!formData.name) errors.name = 'Name is required';
  if (!formData.brand) errors.brand = 'Brand is required';
  if (!formData.year) errors.year = 'Year is required';
  if (!formData.details) errors.details = 'Details is required';

  if (!formData.image) {
    errors.image = 'Image is required';
  } else if (!pixabayRegex.test(formData.image)) {
    errors.image = 'Image must be a valid Pixabay CDN URL';
  }

  if (!formData.altImage) errors.altImage = 'Alt Image is required';
  if (!formData.rating) errors.rating = 'Rating is required';

  return errors;
}