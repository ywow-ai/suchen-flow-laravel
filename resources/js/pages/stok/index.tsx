import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Stok',
    href: '/stok',
  },
];

const StokPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Stok" />
      <p>Stok</p>
    </AppLayout>
  );
};

export default StokPage;
