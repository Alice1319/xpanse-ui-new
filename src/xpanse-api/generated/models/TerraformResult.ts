/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TerraformResult = {
    commandStdOutput?: string;
    commandStdError?: string;
    terraformState?: string;
    importantFileContentMap?: Record<string, string>;
    commandSuccessful?: boolean;
};