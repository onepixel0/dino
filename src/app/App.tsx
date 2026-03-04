import { DistanceBar } from '@/components/DistanceBar/DistanceBar'
import { HealthBar } from '@/components/HealthBar/HealthBar'
import { Viewport } from '../game'
import { Layout } from './Layout'

export function App() {
    return (
        <>
            <Layout>
                <Viewport />
                <HealthBar />
                <DistanceBar />
            </Layout>
        </>
    )
}
