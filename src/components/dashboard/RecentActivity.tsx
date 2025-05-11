"use client";

import React from 'react';
import { Clock, ShoppingBag, Package, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentActivity } from "@/hooks/useSalesData";

export default function RecentActivity() {
  const { data: activities, isLoading, error } = useRecentActivity();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-36">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !activities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground p-4 text-center">
            Unable to load recent activity.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.productName}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {activity.quantity} · ${activity.salePrice.toFixed(2)} each
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timeAgo}
                </p>
              </div>
              <div className="font-medium">
                ${activity.revenue.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 