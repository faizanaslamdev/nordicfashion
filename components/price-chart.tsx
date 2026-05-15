'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Product } from '@/lib/types';
import { getPriceChartData } from '@/lib/services';
import { Card } from '@/components/ui/card';

interface PriceChartProps {
  product: Product;
}

export function PriceChart({ product }: PriceChartProps) {
  const data = getPriceChartData(product.id);

  if (!data || data.length === 0) {
    return null;
  }

  // Group data by date
  const groupedData = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.date === item.date);
    if (existing) {
      existing.price = Math.round((existing.price + item.price) / 2);
    } else {
      acc.push({
        date: item.date,
        price: Math.round(item.price),
      });
    }
    return acc;
  }, [] as Array<{ date: string; price: number }>);

  return (
    <Card className="p-6">
      <h3 className="mb-6 font-semibold text-lg text-foreground">
        30-Day Price History
      </h3>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Price (SEK)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--card-foreground)',
              }}
              formatter={(value) => `${value} SEK`}
            />
            <Legend
              wrapperStyle={{
                color: 'var(--muted-foreground)',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--primary)"
              dot={{ fill: 'var(--primary)', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              name="Average Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
        <div>
          <p className="text-xs text-muted-foreground">Highest</p>
          <p className="text-lg font-bold text-foreground">
            {Math.max(...groupedData.map((d) => d.price))} SEK
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Lowest</p>
          <p className="text-lg font-bold text-foreground">
            {Math.min(...groupedData.map((d) => d.price))} SEK
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Trend</p>
          <p className="text-lg font-bold text-accent">
            {groupedData[groupedData.length - 1].price > groupedData[0].price ? '↑ Up' : '↓ Down'}
          </p>
        </div>
      </div>
    </Card>
  );
}
