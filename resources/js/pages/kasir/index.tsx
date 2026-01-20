import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kasir',
    href: '/kasir',
  },
];

const KasirPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kasir" />
      <p>Kasir</p>
    </AppLayout>
  );
};

export default KasirPage;
