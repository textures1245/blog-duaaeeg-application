<script>
	import BreadcrumbPage from '$lib/components/ui/breadcrumb/breadcrumb-page.svelte';
	import BreadcrumbSeparator from '$lib/components/ui/breadcrumb/breadcrumb-separator.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sheet from '$lib/components/ui/sheet/index';

	export let menu = ['Dashboard', 'For you', 'Explore', 'Trend'];
	export let avatarSrc =
		'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';

	let showStatusBar = true;
	let showActivityBar = false;
	let showPanel = false;
</script>

<div class="grid bg h-20 items-center">
	<header
		class="sticky shadow-md top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
	>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
					<span class="sr-only">Toggle Menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="sm:max-w-xs">
				<nav class="grid gap-6 text-lg font-medium">
					<a
						href="##"
						class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
					>
						<span class="sr-only">Acme Inc</span>
					</a>
					{#each menu as m}
						<a
							href="##"
							class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							{m}
						</a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<Breadcrumb.Root class="hidden md:flex">
			<Breadcrumb.List>
				{#each menu as m}
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">{m}</Breadcrumb.Link>
						<Breadcrumb.BreadcrumbSeparator class="my-4 " />
					</Breadcrumb.Item>
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<div class="relative ml-auto flex-1 md:grow-0">
			<Input
				type="search"
				placeholder="Search..."
				class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
			/>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="outline"
					size="icon"
					class="overflow-hidden m-4 rounded-full"
					builders={[builder]}
				>
					<img
						width="32"
						height="32"
						src={avatarSrc}
						alt="Avatar"
						class="overflow-hidden rounded-full"
					/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Separator />
				<DropdownMenu.Item href="/auth">Sign In</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>
</div>
