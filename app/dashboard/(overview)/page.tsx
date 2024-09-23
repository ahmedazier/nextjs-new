import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import NavLinks from "@/app/ui/dashboard/nav-links";
import {signOut} from "@/auth";
import {PowerIcon} from "@heroicons/react/24/outline";
 
export default async function Page() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();

  return (
    <main>
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard V-2
            </h1>
            <div className="mb-4 text-xl md:text-2xl">
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <button
                        className="flex h-[48px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6"/>
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<CardsSkeleton/>}>
                <CardWrapper/>
            </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <Suspense fallback={<RevenueChartSkeleton/>}>
                <RevenueChart/>
            </Suspense>
            <Suspense fallback={<LatestInvoicesSkeleton/>}>
                <LatestInvoices/>
            </Suspense>
        </div>
    </main>
  );
}