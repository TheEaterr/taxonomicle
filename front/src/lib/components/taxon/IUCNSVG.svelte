<script lang="ts">
	import type { TaxonIucnOptions } from '$lib/generated/pocketBaseTypes';

	export let iucn: TaxonIucnOptions;

	const bgColor = {
		LC: '#066',
		NT: '#066',
		VU: '#C90',
		EN: '#C63',
		CR: '#C33',
		EW: '#000',
		EX: '#000',
		DD: '#666'
	}[iucn];

	const textColor = {
		LC: '#FFF',
		NT: '#9C9',
		VU: '#FFC',
		EN: '#FC9',
		CR: '#FCC',
		EW: '#FFF',
		EX: '#C33',
		DD: '#FFF'
	}[iucn];

	// The following SVG was taken from wikipedia commons :
	// https://en.wikipedia.org/wiki/File:Status_iucn3.1.svg
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="https://www.w3.org/1999/xlink"
	viewBox="0 0 256 68.27"
	class="max-h-20"
>
	<g
		stroke-width=".6"
		stroke="#666"
		fill="currentColor"
		class="text-absolute-content"
		transform="translate(0 49.5)"
	>
		<circle cx="24.4" r="13.3" fill={iucn == 'EX' ? bgColor : undefined} />
		<circle cx="58" r="13.3" fill={iucn == 'EW' ? bgColor : undefined} />
		<circle cx="92" r="13.3" fill={iucn == 'CR' ? bgColor : undefined} />
		<circle cx="126" r="13.3" fill={iucn == 'EN' ? bgColor : undefined} />
		<circle cx="161" r="13.3" fill={iucn == 'VU' ? bgColor : undefined} />
		<circle cx="194" r="13.3" fill={iucn == 'NT' ? bgColor : undefined} />
		<circle cx="228" r="13.3" fill={iucn == 'LC' ? bgColor : undefined} />
	</g>
	<g fill="currentColor" class="text-absolute">
		<path
			fill={iucn == 'EX' ? textColor : undefined}
			d="M16.3 54.1v-8.93h6.82v1.51h-4.96v1.98h4.62v1.5h-4.62v2.43h5.14v1.5zm9.86 0h-2.21l3.14-4.67-2.85-4.27h2.17l1.84 2.87 1.81-2.87h2.15l-2.86 4.34 3.14 4.6h-2.24l-2.04-3.09z"
		/>
		<path
			fill={iucn == 'EW' ? textColor : undefined}
			d="m48.4 54.1v-8.93h6.82v1.51h-4.96v1.98h4.62v1.5h-4.62v2.43h5.14v1.5zm9.89 0-2.2-8.93h1.9l1.39 6.14 1.68-6.14h2.21l1.61 6.24 1.41-6.24h1.87l-2.23 8.93h-1.97l-1.83-6.68-1.83 6.68z"
		/>
		<path
			fill={iucn == 'CR' ? textColor : undefined}
			d="M89.3 50.8l1.8.555c-.276.975-.735 1.7-1.38 2.17s-1.46.71-2.44.71c-1.22 0-2.23-.405-3.01-1.22s-1.18-1.92-1.18-3.32.395-2.64 1.19-3.46 1.83-1.23 3.12-1.23c1.12 0 2.04.323 2.74.969.418.382.732.93.941 1.64l-1.84.427c-.109-.463-.336-.829-.681-1.1s-.764-.402-1.26-.402c-.682 0-1.24.238-1.66.713s-.637 1.24-.637 2.31.209 1.93.628 2.41.962.719 1.63.719c.494 0 .918-.152 1.27-.457s.611-.784.766-1.44z"
		/>
		<path
			fill={iucn == 'CR' ? textColor : undefined}
			d="M92.71 54.08v-8.93h3.91c.983 0 1.7.0802 2.14.241s.802.446 1.07.856.402.88.402 1.41c0 .67-.203 1.22-.609 1.66s-1.01.712-1.82.826c.402.228.733.477.995.75s.614.756 1.06 1.45l1.12 1.74h-2.22l-1.34-1.94c-.477-.695-.803-1.13-.979-1.31s-.362-.305-.558-.372-.508-.101-.935-.101h-.376v3.73zm1.86-5.16h1.37c.891 0 1.45-.0366 1.67-.11s.395-.199.521-.378.188-.402.188-.67-.0826-.543-.248-.728-.398-.302-.7-.35c-.151-.0203-.602-.0305-1.36-.0305h-1.45z"
		/>
		<path
			fill={iucn == 'EN' ? textColor : undefined}
			d="m118 54.1v-8.93h6.82v1.51h-4.96v1.98h4.62v1.5h-4.62v2.43h5.14v1.5zm8.6 0v-8.93h1.81l3.76 5.97v-5.97h1.73v8.93h-1.86l-3.71-5.83v5.83z"
		/>
		<path
			fill={iucn == 'VU' ? textColor : undefined}
			d="M156.98 54.1H155l-3.29-8.93h2.01l2.33 6.61 2.25-6.61h1.97zm4.24-8.93h1.86v4.84c0 .768.0231 1.27.0691 1.49.0795.366.269.659.568.881s.708.332 1.23.332.924-.105 1.19-.314.429-.466.483-.771.0816-.811.0816-1.52v-4.94h1.86v4.69c0 1.07-.0502 1.83-.151 2.27s-.286.817-.555 1.12-.631.548-1.08.728-1.04.271-1.77.271-1.54-.0985-2-.296-.813-.453-1.08-.768-.437-.645-.521-.99-.182-1.27-.182-2.27z"
		/>
		<path
			fill={iucn == 'NT' ? textColor : undefined}
			d="m186 54.1v-8.93h1.81l3.76 5.97v-5.97h1.73v8.93h-1.86l-3.71-5.83v5.83zm11.3 0v-7.42h-2.73v-1.51h7.31v1.51h-2.72v7.42z"
		/>
		<path
			fill={iucn == 'LC' ? textColor : undefined}
			d="M233.7 50.8l1.8.555c-.276.975-.735 1.7-1.38 2.17s-1.46.71-2.44.71c-1.22 0-2.23-.405-3.01-1.22s-1.18-1.92-1.18-3.32.395-2.64 1.19-3.46 1.83-1.23 3.12-1.23c1.12 0 2.04.323 2.74.969.418.382.732.93.941 1.64l-1.84.427c-.109-.463-.336-.829-.681-1.1s-.764-.402-1.26-.402c-.682 0-1.24.238-1.66.713s-.637 1.24-.637 2.31.209 1.93.628 2.41.962.719 1.63.719c.494 0 .918-.152 1.27-.457s.611-.784.766-1.44z"
		/>
		<path fill={iucn == 'LC' ? textColor : undefined} d="M220 54.1v-8.86h1.86v7.36h4.62v1.5z" />
		<path
			d="M90.8 31.6c-3.51 0-6.27.244-8.28.731s-3.42 1.31-4.25 2.46c0-1.59.559-2.81 1.68-3.66s2.87-1.44 5.24-1.77 5.58-.493 9.6-.493h18.4c2.46 0 4.42-.0689 5.86-.207s2.75-.461 3.91-.97c1.47-.806 2.28-1.52 2.42-2.15.708 1.05 2.04 1.88 3.99 2.48s4.66.843 8.36.843h20.8c5.97 0 9.92.498 11.8 1.49s2.93 2.43 2.93 4.44c-1.05-1.21-2.51-2.04-4.4-2.5s-4.58-.692-8.09-.692h-21.2c-4.19 0-7.4-.246-9.62-.739s-3.77-1.44-4.65-2.84c-.821 1.44-2.41 2.4-4.78 2.87s-5.81.707-10.3.707z"
		/>
	</g>
	<path stroke="currentColor" class="text-absolute" d="M24.4 25.1v7.66M227 25.1v7.66" />
	<g
		fill="currentColor"
		class="text-absolute"
		font-family="sans-serif"
		font-size="11"
		text-anchor="middle"
	>
		<switch transform="translate(24.7 22.2)"
			><text id="txex"><tspan id="tspex" x="1">Extinct</tspan></text></switch
		>
		<switch transform="translate(124.3 22.2)">
			<text id="txth"><tspan id="tspth" x="1.5">Threatened</tspan></text></switch
		>
		<switch transform="translate(226.6 11.4)"
			><text id="txLC1"><tspan id="tspLC1">Least</tspan></text></switch
		>
		<switch transform="translate(226 22.1)">
			<text id="txLC2"><tspan id="tspLC2">Concern</tspan></text></switch
		>
	</g>
</svg>
