import { Head } from '@inertiajs/react';

import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Member',
    href: '/member',
  },
];

const MemberPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Member" />
      <p>Member</p>
    </AppLayout>
  );
};

export default MemberPage;
