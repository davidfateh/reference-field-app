import React, { useEffect } from 'react';
import {
    Card,
    Typography,
    Heading,
    CardActions,
    DropdownList,
    DropdownListItem,
} from '@contentful/forma-36-react-components';
import { MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
    sdk: FieldExtensionSDK;
}

const customRenderer = (props: any) => {
    if (props.contentType.sys.id !== 'blogPost') {
        return false;
    }
    const title = props.entity.fields?.title?.[props.localeCode] || 'Untitled';

    return (
        <Card style={{ flexGrow: 1 }} padding="none">
            <div style={{ display: 'flex' }}>
                <div>{props.cardDragHandle}</div>
                <div style={{ flexGrow: 1, padding: '1em' }}>
                    <Typography style={{ marginBottom: '20px' }}>
                        <Heading style={{ borderBottom: '1px solid gray' }}>
                            {title}
                        </Heading>
                        {props.entity.fields.body &&
                            documentToReactComponents(
                                props.entity.fields.body[props.localeCode]
                            )}
                    </Typography>
                </div>
                <div style={{ padding: '1em' }}>
                    <CardActions>
                        <DropdownList>
                            <DropdownListItem onClick={props.onEdit}>
                                Edit
                            </DropdownListItem>
                            <DropdownListItem onClick={props.onRemove}>
                                Remove
                            </DropdownListItem>
                        </DropdownList>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
};

const Field = (props: FieldProps) => {
    useEffect(() => {
        props.sdk.window.startAutoResizer();
    });

    return (
        <MultipleEntryReferenceEditor
            renderCustomCard={customRenderer}
            viewType="link"
            sdk={props.sdk}
            isInitiallyDisabled
            hasCardEditActions
            parameters={{
                instance: {
                    showCreateEntityAction: true,
                    showLinkEntityAction: true,
                },
            }}
        />
    );
};

export default Field;
