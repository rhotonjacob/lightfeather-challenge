import { NextApiRequest, NextApiResponse } from "next"
import got from "got"
import { sortBy } from "lodash"

interface SupervisorRawResponse {
    id: string;
    identificationNumber: string;
    firstName: string;
    lastName: string;
    jurisdiction: string;
    phone: string;
}


function responseTranform(results: SupervisorRawResponse[]) {
    // Remove all numeric jurisdictions
    const filtered = results.filter((r) => isNaN(parseInt(r.jurisdiction)))
    // Sort by jurisdiction, then lastName, then firstName
    const sorted = sortBy(filtered, ["jurisdiction", "lastName", "firstName"])
    // Transform to display format
    return sorted.map((r) => `${r.jurisdiction} - ${r.lastName}, ${r.firstName}`)
}


async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const results: SupervisorRawResponse[] = await got.get("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers").json();

        res.status(200).json(responseTranform(results))
    } catch (err) {        
        res.status(500).json({ statusCode: 500, message: err.message })
    }
};

export default handler