import type { ReactElement } from 'react'
import HomeHead from '../../components/HomeHead'
import LogsLayout from '../../layouts/LogsLayout'
import { Text } from '@nextui-org/react'
import { PrismaClient } from '@prisma/client'
import Main from '../../components/Logs/Main'


function LogsHome() {
	return (
		<>
			<HomeHead title="3zachm.dev | Logs" description="anny logs" path="logs" />
            <Main />
		</>
	)
}

LogsHome.getLayout = function getLayout(page: ReactElement) {
	return (
		<LogsLayout>{page}</LogsLayout>
	)
}

LogsHome.auth = true;

export default LogsHome;
