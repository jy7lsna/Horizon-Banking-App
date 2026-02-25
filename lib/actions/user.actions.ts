'use server';

import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { parseStringify } from '../utils';

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn } = userData;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                address: address1,
                city,
                state,
                postalCode,
                dateOfBirth: new Date(dateOfBirth),
                ssn,
            },
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getLoggedInUser = async () => {
    try {
        const user = await prisma.user.findFirst({
            include: {
                banks: true,
            },
        });

        return parseStringify(user);
    } catch (error) {
        console.error('Error getting logged in user:', error);
        return null;
    }
};

export const getUserInfo = async ({ userId }: { userId: string }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                banks: {
                    include: {
                        transactions: {
                            orderBy: {
                                date: 'desc',
                            },
                            take: 10,
                        },
                    },
                },
            },
        });

        return parseStringify(user);
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};
