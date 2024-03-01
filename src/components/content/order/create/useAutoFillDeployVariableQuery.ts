/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { AutoFill, CloudResourcesService, DeployRequest } from '../../../../xpanse-api/generated';
import { useQuery } from '@tanstack/react-query';

export default function useAutoFillDeployVariableQuery(
    csp: DeployRequest.csp,
    region: string,
    kind: AutoFill.deployResourceKind | undefined
) {
    return useQuery({
        queryKey: ['getExistingResourcesOfType', csp, region, kind],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        queryFn: () => CloudResourcesService.getExistingResourcesOfType(csp, region, kind!),
        enabled: kind !== undefined,
    });
}