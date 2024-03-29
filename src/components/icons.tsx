import type { JSX } from 'solid-js'
import { css } from '@acab/ecsstatic'

const tw = css`
    fill: #1D9BF0;
    @media (prefers-color-scheme:dark) {
        fill: #FFF;
    }
`
export const TwitterIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 248 204" height="32" role="img" aria-label="Twitter" class={`${tw} ${props.class}`}>
        <path d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"/>
    </svg>
)

const gh = css`
    fill: #24292f;
    @media (prefers-color-scheme:dark) {
        fill: #FFF;
    }
`
export const GitHubIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 98 96" height="32" role="img" aria-label="GitHub" class={`${gh} ${props.class}`}>
        <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
    </svg>
)

const icon = css`
    fill: currentColor;
    stroke: currentColor;
`
export const FeedIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    // https://iconmonstr.com/rss-feed-1-svg/
    <svg {...props} viewBox="0 0 24 24" height="32" role="img" aria-label="フィード" class={`${icon} ${props.class}`}>
        <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
    </svg>
)

export const LeftArrow = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    // https://iconmonstr.com/angel-left-thin-svg/
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" role="img" class={`${icon} ${props.class}`}>
        <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
    </svg>
)

export const RightArrow = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    // https://iconmonstr.com/angel-right-thin-svg/
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" role="img" class={`${icon} ${props.class}`}>
        <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
    </svg>
)
