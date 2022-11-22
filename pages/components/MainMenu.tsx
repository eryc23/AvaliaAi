import {PencilSquareIcon} from '@heroicons/react/24/solid';
import Head from 'next/head';

export default function MainMenu({subtitle}: {subtitle: string}){
    return(
        <>
            <Head>
                <title> {subtitle} | AvaliaAí</title>
            </Head>
            <header className="sticky top-0 z-30 h-[72px] bg-slate-900 bg-opacity-50 backdrop-blur backdrop-filter firefox:bg-opacity-90">
                <div className="mx-auto max-w-8xl xl:px-8">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-5 sm:px-6 lg:px-8 xl:px-0">
                    <a className="flex items-center justify-center" href="/">
                    <PencilSquareIcon className="h-6 w-6"/> {'  '} &nbsp;AvaliaAí
                    </a>
                </div>
                </div>
            </header>
        </>
    )
}