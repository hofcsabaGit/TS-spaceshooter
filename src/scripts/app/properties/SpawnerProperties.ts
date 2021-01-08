export enum SpawnerType {Bullet, Enemy};
export class SpawnerProperties{
    public spawnerType : SpawnerType;
    constructor(spawnerType:SpawnerType){
        this.spawnerType= spawnerType;
    }
}