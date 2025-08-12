/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer les formulaires avec validation
 * @param initialValues - Valeurs initiales du formulaire
 * @param validate - Fonction de validation
 * @param onSubmit - Fonction à exécuter lors de la soumission
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => Record<string, string>,
  onSubmit: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Réinitialiser le formulaire avec de nouvelles valeurs
  const resetForm = (newValues?: T) => {
    setValues(newValues || initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Gérer les changements de valeurs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues({
      ...values,
      [name]: val
    });
  };

  // Marquer un champ comme touché
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Marquer tous les champs comme touchés
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      onSubmit(values);
    }
  };

  // Réinitialiser isSubmitting après soumission
  useEffect(() => {
    if (isSubmitting) {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};
