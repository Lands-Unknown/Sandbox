import {EnemyId} from "./EnemyId";

export interface EnemyConfig {
    id: EnemyId;

    name: string;

    /**
     * The amount of health
     *
     * @minimum 0
     * @default 5
     * @TJS-type integer
     */
    health: number;

}
