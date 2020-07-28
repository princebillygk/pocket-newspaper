export function convertSnapShotArrayToDataArray(...snapshots: any): any[] {
    let data: any[] = [];
    for (const snapshotIndex in snapshots) {
        snapshots[snapshotIndex].forEach((docSnapShot: any) => data.push(docSnapShot.data()));
    }
    return data;
}