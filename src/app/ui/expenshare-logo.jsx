import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function ExpenShareLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CurrencyDollarIcon className="h-12 w-12 glow" />
      <p className="text-[44px]">ExpenShare</p>
    </div>
  );
}

