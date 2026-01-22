import { Head } from '@inertiajs/react';

import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Transaksi',
    href: '/transaksi',
  },
];

const TransaksiPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Transaksi" />
      <p>Transaksi</p>
    </AppLayout>
  );
};

export default TransaksiPage;
