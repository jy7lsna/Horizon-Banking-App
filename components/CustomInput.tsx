'use client';

import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';

const authFormSchema = (type: string) =>
    z.object({
        firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
        city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
        state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
        postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
        dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    });

type FormSchema = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomInputProps {
    control: Control<FormSchema>;
    name: FieldPath<FormSchema>;
    label: string;
    placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export { authFormSchema };
export default CustomInput;
