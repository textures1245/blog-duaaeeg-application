<script context="module" lang="ts">
	export type MenuAction = {
		label: string;
		hrefTarget?: string;
		icon: typeof SvelteComponent;
		component?: typeof SvelteComponent;
	};
</script>

<script lang="ts">
	import type { User } from '$lib/internal/model/auth/domains/user';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from '$lib/components/ui/sheet/index';
	import { toggleMode } from 'mode-watcher';
	import { Moon, Sun } from 'svelte-radix';
	import type { SvelteComponent } from 'svelte';

	export let menu: MenuAction[];
	export let avatarSrc =
		'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';

	export let user: User | null | undefined;
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
						{#if m.hrefTarget}
							<a
								href="##"
								class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<svelte:component this={m.icon} />
								{m.label}
							</a>
						{/if}

						{#if m.component}
							<svelte:component this={m.icon} />
							<svelte:component this={m.component} />
						{/if}
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<Breadcrumb.Root class="hidden md:flex">
			<Breadcrumb.List>
				{#each menu as m}
					{#if m.hrefTarget}
						<a
							href="##"
							class="flex items-center gap-4 text-muted-foreground hover:text-foreground"
						>
							<svelte:component this={m.icon} size="18" />
							{m.label}
						</a>
					{/if}
					{#if m.component}
						<div class="flex items-center gap-0 text-muted-foreground hover:text-foreground">
							<svelte:component this={m.icon} size="18" />
							<svelte:component this={m.component} />
						</div>
					{/if}
					<Breadcrumb.BreadcrumbSeparator class="my-4 " />
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
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		{#if !user}
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
		{:else}
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
							src={user.user_profile.profile_picture ?? avatarSrc}
							alt="Avatar"
							class="overflow-hidden rounded-full"
						/>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item href={`/user-profile/${user.uuid}`}>Profile Setting</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item href="/auth?action=logout">Sign Out</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</header>
</div>
