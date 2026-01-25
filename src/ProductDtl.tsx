import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ProductDtl() {
    const { id } = useParams();
    const { token } = useAuth();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (!token || !id) {
            return;
        }

        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }

                const data = await response.json();
                setProduct(data.data);
            } catch (err) {
                console.log("Fetch Error", err);
            }
        };

        fetchProductData();
    }, [token, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b">
                <h1 className="text-xl font-bold">Product Detail</h1>
            </header>
            <main className="flex-1 p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{product.name || 'No Name'}</CardTitle>
                        <CardDescription>{product.description || 'No description available.'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Price: ${product.price || 'N/A'}</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}