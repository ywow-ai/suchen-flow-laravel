import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { index } from '@/routes/dashboard';
import { store } from '@/routes/login';
import { Form, Head, Link } from '@inertiajs/react';
import { HTMLAttributes } from 'react';

interface LoginProps {
  status?: string;
}

function InputError({
  message,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p
      {...props}
      className={cn('text-sm text-red-600 dark:text-red-400', className)}
    >
      {message}
    </p>
  ) : null;
}

export default function Login({ status }: LoginProps) {
  const title = 'Masuk ke akun Anda';
  const description =
    'Masukkan username dan kata sandi Anda di bawah untuk masuk';

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link
              href={index()}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                logo
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-xl font-medium">{title}</h1>
              <p className="text-center text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <Head title="Masuk" />

          <Form
            {...store.form()}
            resetOnSuccess={['password']}
            className="flex flex-col gap-6"
          >
            {({ processing, errors }) => (
              <>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Alamat Email</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="username"
                      placeholder="username@contoh.com"
                    />
                    <InputError message={errors.username} />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Kata Sandi</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      placeholder="Kata sandi"
                    />
                    <InputError message={errors.password} />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="remember" name="remember" tabIndex={3} />
                    <Label htmlFor="remember">Ingat saya</Label>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                    data-test="login-button"
                  >
                    {processing && <Spinner />}
                    Masuk
                  </Button>
                </div>
              </>
            )}
          </Form>

          {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
