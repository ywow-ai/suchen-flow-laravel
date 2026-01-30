import { Form, Head, progress, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import qs from 'qs';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppLayout } from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { store } from '@/routes/produk';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Produk',
    href: '/produk',
  },
];

interface ProdukPageProps {
  data: Array<{
    id: number;
    name: string;
    category: string;
    description: string | null;
    image: string | null;
    user_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  }>;
  current_page?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
  category?: string;
  search?: string;
}

const columns = [
  { key: 'image', header: 'Gambar' },
  { key: 'name', header: 'Nama' },
  { key: 'category', header: 'Kategori' },
  { key: 'description', header: 'Deskripsi' },
] as const;

const categories = [
  { value: '*', label: 'Semua' },
  { value: 'Makanan', label: 'Makanan' },
  { value: 'Minuman', label: 'Minuman' },
] as const;

type Category = (typeof categories)[number]['value'];
type Params = Record<string, string | number>;

const ProdukPage = ({
  data = [],
  current_page = 1,
  per_page = 10,
  total = 0,
  last_page = 1,
  category: categoryFilter = '*',
  search: searchFilter = '',
}: ProdukPageProps) => {
  const { url } = usePage();
  const ids = {
    foto: useId(),
    nama: useId(),
    category: useId(),
    search: useId(),
  };

  const [open, onOpenChange] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>('Makanan');
  const [search, setSearch] = useState(searchFilter);
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateQueryParams = useCallback(
    (query: Params | ((params: Params) => Params)) => {
      progress.start();
      const { pathname, search } = new URL(url, window.location.origin);
      const current = qs.parse(search, {
        ignoreQueryPrefix: true,
      }) as Params;

      const params = typeof query === 'function' ? query(current) : query;
      const newParams = Object.fromEntries(
        Object.entries(params)
          .map(([key, value]) => [key, String(value)])
          .filter(([, value]) => !/^(?:\*|null|undefined|)$/.test(value)),
      );

      const queryString = qs.stringify(newParams, { addQueryPrefix: true });
      const newUrl = pathname + queryString;

      router.get(newUrl, {}, { preserveState: true, preserveScroll: true });
      progress.finish();
    },
    [url],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateQueryParams({ search: value, page: 1 });
      }, 500),
    [updateQueryParams],
  );

  // Sync search state with props
  useEffect(() => {
    setSearch(searchFilter);
  }, [searchFilter]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />

      <div className="flex w-full flex-col gap-6 px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 lg:order-last">
            <Label htmlFor="view-selector" className="sr-only">
              Tampilan
            </Label>
            <Select
              value={categoryFilter}
              onValueChange={(value) =>
                updateQueryParams((prev) => ({
                  ...prev,
                  category: value,
                  page: 1,
                }))
              }
            >
              <SelectTrigger className="w-fit" size="sm" id="view-selector">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ value, label }, k) => (
                  <SelectItem key={k} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog onOpenChange={onOpenChange} open={open}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus />
                  <span className="inline">Tambah Produk</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="overflow-y-auto p-0">
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex flex-col gap-1">
                    <DialogHeader>
                      <DialogTitle>Tambah Produk Baru</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Tambahkan produk baru ke dalam sistem. Isi semua informasi
                      yang diperlukan untuk produk ini. Pastikan data yang
                      dimasukkan sudah benar sebelum disimpan.
                    </DialogDescription>
                  </div>
                  <Form
                    {...store.form()}
                    options={{
                      preserveScroll: true,
                    }}
                    className="space-y-4"
                    onSuccess={() => onOpenChange(false)}
                  >
                    {({ resetAndClearErrors, processing, errors }) => {
                      return (
                        <>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={ids.foto}>Foto Produk</Label>
                              <p className="mb-2 text-sm text-muted-foreground">
                                Upload foto produk (opsional)
                              </p>
                              <div className="relative">
                                <label
                                  htmlFor={ids.foto}
                                  className={cn(
                                    'flex cursor-pointer rounded-sm border-border',
                                    imagePreview
                                      ? 'h-auto w-full overflow-hidden border'
                                      : 'h-40 flex-col items-center justify-center border-2 border-dashed transition-colors hover:border-primary hover:bg-accent',
                                  )}
                                >
                                  {imagePreview ? (
                                    <img
                                      src={URL.createObjectURL(imagePreview)}
                                      alt="Preview"
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <>
                                      <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                                      <span className="text-sm text-foreground">
                                        Klik untuk upload foto
                                      </span>
                                      <span className="mt-1 text-xs text-muted-foreground">
                                        Hanya 1 gambar
                                      </span>
                                    </>
                                  )}
                                  <input
                                    ref={fileInputRef}
                                    id={ids.foto}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={({
                                      currentTarget: { files },
                                    }) => {
                                      if (files) {
                                        setImagePreview(files[0]);
                                      }
                                    }}
                                    className="hidden"
                                    multiple={false}
                                  />
                                </label>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImagePreview(null);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = '';
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <InputError message={errors.image} />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={ids.nama}>Nama Produk *</Label>
                              <Input
                                id={ids.nama}
                                name="name"
                                placeholder="Contoh: Mie Goreng"
                                required
                                autoFocus
                              />
                              <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={ids.category}>Kategori *</Label>
                              <Select
                                value={category}
                                onValueChange={(value: Category) =>
                                  setCategory(value)
                                }
                                required
                              >
                                <SelectTrigger
                                  className="w-full"
                                  id={ids.category}
                                >
                                  <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories
                                    .filter(({ value }) => value !== '*')
                                    .map(({ value, label }, k) => (
                                      <SelectItem key={k} value={value}>
                                        {label}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <input
                                type="hidden"
                                name="category"
                                value={category}
                              />
                              <InputError message={errors.category} />
                            </div>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  resetAndClearErrors();
                                  setImagePreview(null);
                                  setCategory('Makanan');
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                  }
                                }}
                              >
                                Batal
                              </Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              className="gradient-primary text-primary-foreground"
                              disabled={processing}
                            >
                              {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                          </DialogFooter>
                        </>
                      );
                    }}
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative flex-1 lg:max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={ids.search}
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={({ currentTarget: { value } }) => {
                setSearch(value);
                debouncedSearch(value);
              }}
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="h-16 w-16 overflow-hidden rounded-sm">
                        <img
                          src={row.image || '/placeholder.svg'}
                          alt={row.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {row.description || '-'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada hasil.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            Menampilkan {data.length} dari {total} produk
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Baris per halaman
              </Label>
              <Select
                value={`${per_page}`}
                onValueChange={(value) =>
                  updateQueryParams((prev) => ({
                    ...prev,
                    per_page: value,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={per_page} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Halaman {current_page} dari {last_page}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() =>
                  updateQueryParams((prev) => ({ ...prev, page: 1 }))
                }
                disabled={current_page === 1}
              >
                <span className="sr-only">Ke halaman pertama</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() =>
                  updateQueryParams((prev) => ({
                    ...prev,
                    page: current_page - 1,
                  }))
                }
                disabled={current_page === 1}
              >
                <span className="sr-only">Ke halaman sebelumnya</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() =>
                  updateQueryParams((prev) => ({
                    ...prev,
                    page: current_page + 1,
                  }))
                }
                disabled={current_page >= last_page}
              >
                <span className="sr-only">Ke halaman berikutnya</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() =>
                  updateQueryParams((prev) => ({ ...prev, page: last_page }))
                }
                disabled={current_page >= last_page}
              >
                <span className="sr-only">Ke halaman terakhir</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProdukPage;
