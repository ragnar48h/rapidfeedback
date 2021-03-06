import useSWR from 'swr';

import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const auth = useAuth();
  const {data} = useSWR('/api/sites', fetcher)
  
  if(!data)    return (
    <DashboardShell>
      <EmptyState/>
    </DashboardShell>
  )
  
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites}/> : <EmptyState/>}
    </DashboardShell>
  )
}
