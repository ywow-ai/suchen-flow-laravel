import { Form, Head, Link } from '@inertiajs/react';
import { Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Head title="Masuk" />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Building2 className="size-4!" />
            </div>
            {appName}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Form
              {...store.form()}
              resetOnSuccess={['password']}
              className="flex flex-col gap-6"
            >
              {({ processing, errors }) => (
                <>
                  <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
                      <p className="text-sm text-balance text-muted-foreground">
                        Masukkan username dan kata sandi Anda di bawah untuk
                        masuk
                      </p>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="username"
                        placeholder="kai"
                      />
                      {errors.username && (
                        <p className="text-sm text-destructive">
                          {errors.username}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="Kata sandi"
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">
                          {errors.password}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <Button
                        type="submit"
                        tabIndex={4}
                        disabled={processing}
                        data-test="login-button"
                      >
                        {processing && <Spinner />}
                        Masuk
                      </Button>
                    </Field>
                  </FieldGroup>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
