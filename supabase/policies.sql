alter table ads enable row level security;
alter table profiles enable row level security;

create policy "Anyone can read approved ads"
on ads
for select
using (status = 'approved');

create policy "Users can create own ads"
on ads
for insert
with check (auth.uid() = user_id);

create policy "Users can update own ads"
on ads
for update
using (auth.uid() = user_id);

create policy "Users can read own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);
