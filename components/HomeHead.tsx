import Head from 'next/head'

interface HeadProps {
    title: string;
    description: string;
    path: string;
}

function HomeHead(props : HeadProps) {
    const path = "https://3zachm.dev/" + props.path;
    return (
        <Head>
	`			<title>{props.title}</title>
				<meta name="title" content={props.title}/>
				<meta property="og:title" content={props.title}/>
				<meta property="twitter:title" content={props.title}/>
				<meta property="twitter:image" content="https://3zachm.dev/img/3zachm.png"/>
				<meta property="og:image" content="'.$META_IMG.'"/>
				<meta name="description" content={props.description}/>
				<meta property="og:description" content={props.description}/>
				<meta property="twitter:description" content={props.description}/>

				<meta property="og:url" content={path}/>
				<meta property="og:type" content="website"/>
				<meta name="theme-color" content="#b875d7" data-react-helmet="true"/>

				<meta property="twitter:url" content={path}/>
				<meta property="twitter:card" content="summary"/>

				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
			</Head>
    )
}

export default HomeHead;