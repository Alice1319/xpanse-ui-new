/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import DisplayOclData from './DisplayOclData';
import { Alert, UploadFile } from 'antd';
import React from 'react';
import { Ocl } from '../../../xpanse-api/generated';
import { ValidationStatus } from './ValidationStatus';

function OclSummaryDisplay(
    setOclValidationStatus: (newState: ValidationStatus) => void,
    ocl: Ocl,
    file: UploadFile
): JSX.Element {
    if (ocl) {
        const oclTableData = DisplayOclData({ ocl: ocl });
        if (typeof oclTableData === 'string') {
            file.status = 'error';
            setOclValidationStatus('error');
            return (
                <Alert
                    type={'error'}
                    showIcon={true}
                    message={`OCL data in the uploaded file not Valid. Error while parsing - ${oclTableData}`}
                />
            );
        } else {
            file.status = 'success';
            setOclValidationStatus('completed');
            return oclTableData;
        }
    }
    return <></>;
}

export default OclSummaryDisplay;