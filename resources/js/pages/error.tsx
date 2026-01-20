import { Head } from '@inertiajs/react';
import { AlertCircle, Server, Shield, Wrench } from 'lucide-react';

interface ErrorPageProps {
  status: number;
}

export default function ErrorPage({ status }: ErrorPageProps) {
  const errorConfig: Record<
    number,
    { title: string; description: string; icon: any }
  > = {
    404: {
      title: '404: Page Not Found',
      description: 'The page you are looking for could not be found.',
      icon: AlertCircle,
    },
    403: {
      title: '403: Forbidden',
      description: 'You do not have permission to access this page.',
      icon: Shield,
    },
    500: {
      title: '500: Server Error',
      description: 'Something went wrong on our servers.',
      icon: Server,
    },
    503: {
      title: '503: Service Unavailable',
      description: 'We are under maintenance. Please try again soon.',
      icon: Wrench,
    },
  };

  const {
    title,
    description,
    icon: Icon,
  } = errorConfig[status] || {
    title: `${status}: Unexpected Error`,
    description: 'An unknown error occurred. Please try again later.',
    icon: AlertCircle,
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Head title={title} />
      <div className="mb-6 rounded-full bg-gray-100 p-8">
        <Icon className="h-16 w-16 text-gray-600" />
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}
