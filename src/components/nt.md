export const follow = async (req: Request, res: Response) => {
    try {
        const source = req.query.source as string;
        const destination = req.query.destination as string;

        if (!source || !destination) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Please provide both sourceId and destinationId."
                }
            });
        }

        const sourceUser = await UserModel.findOne({ name: source}).lean();
        const destinationUser = await UserModel.findOne({ name: destination}).lean();

        if (!sourceUser || !destinationUser) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "User not found."
                }
            });
        }

        const sourceObjectId =sourceUser._id;
        const destinationObjectId = destinationUser._id;

        let paths: Array<Array<string>> = [];
        let isVisited = new Set<string>();
        let tempPath: Array<string> = [];

        async function DFS(currentId:string, destinationId:string) {
            if (currentId==destinationId) {
                paths.push([...tempPath]);
                return;
            }

            const user = await UserModel.findById(currentId).lean();
            const friends: Types.ObjectId[] = (user?.friends as Types.ObjectId[]) || [];

            for (const newFriend of friends) {
                if (!isVisited.has(newFriend.toString())) {
                    isVisited.add(newFriend.toString());
                    tempPath.push(newFriend.toString());
                    await DFS(newFriend.toString(), destinationId);
                    tempPath.pop();
                    isVisited.delete(newFriend.toString());
                }
            }
        }

        tempPath.push(sourceObjectId.toString());
        isVisited.add(sourceObjectId.toString());
        let ResultPath:Array<Array<unknown>> = [];
        await DFS(sourceObjectId.toString(), destinationObjectId.toString());
        for(const path of paths){
            let newPath:Array<unknown> = [];
            for(const userId of path){
                const user = await UserModel.findById(userId).lean();
                newPath.push(user)
            }
            ResultPath.push(newPath)
        }
        return res.status(200).json({
            status: 200,
            data: ResultPath,
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "Something went wrong."
            }
        });
    }
};