"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl text-center p-6">
        <CardHeader>
          <Bus size={50} className="text-blue-600 mx-auto" />
          <CardTitle className="text-3xl font-bold mt-4">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Oops! The page you're looking for doesn't exist.</p>
          <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
