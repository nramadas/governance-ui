import { produce } from 'immer';
import { useState } from 'react';

import { FieldDescription } from '../common/FieldDescription';
import { FieldHeader } from '../common/FieldHeader';
import { FieldIconPreview } from '../common/FieldIconPreview';
import { FieldRichTextEditor } from '../common/FieldRichTextEditor';
import { SecondaryRed } from '@hub/components/controls/Button';
import { Input } from '@hub/components/controls/Input';
import { isEmpty } from '@hub/lib/richText';
import { RichTextDocument } from '@hub/types/RichTextDocument';

interface Props {
  className?: string;
  index: number;
  member: {
    avatar: null | string;
    description: null | RichTextDocument;
    name: string;
    role: null | string;
    twitter: null | string;
  };
  onChange?(member: {
    avatar: null | string;
    description: null | RichTextDocument;
    name: string;
    role: null | string;
    twitter: null | string;
  }): void;
  onDelete?(): void;
}

export function Member(props: Props) {
  const [nameError, setNameError] = useState(false);

  return (
    <div className={props.className}>
      <div className="flex items-center justify-between mb-2">
        <h1 className="my-0 text-xl sm:text-2xl text-sky-500 font-medium leading-[40px]">
          Member {props.index + 1}
        </h1>
        <SecondaryRed
          disabled={
            !props.member.avatar &&
            !props.member.description &&
            !props.member.name &&
            !props.member.role &&
            !props.member.twitter &&
            !nameError
          }
          onClick={props.onDelete}
        >
          Delete member
        </SecondaryRed>
      </div>
      <FieldHeader className="mb-1 mt-8">Name</FieldHeader>
      <Input
        className="w-full"
        placeholder="e.g. Steve Jobs"
        value={props.member.name}
        onBlur={(e) => {
          const value = e.currentTarget.value;

          if (!value) {
            setNameError(true);
          } else {
            setNameError(false);
          }
        }}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setNameError(false);
          const newMember = produce(props.member, (draft) => {
            draft.name = value;
          });
          props.onChange?.(newMember);
        }}
      />
      {nameError && (
        <div className="flex items-center text-rose-500 text-xs mt-1">
          You must provide a name
        </div>
      )}
      <FieldHeader className="mb-1 mt-8">Avatar</FieldHeader>
      <FieldDescription>
        Please input a URL linking to a square JPG or PNG. Preferably under
        300KB to prevent long load times. The url should support hot-linking.
        You can test that the url supports hotlinking using the preview. If your
        image does not appear in preview, please try a different url.
      </FieldDescription>
      <div className="grid items-center grid-cols-[1fr,56px] gap-x-4 mt-2">
        <Input
          className="w-full"
          placeholder="e.g. imgur.com/avatar.png"
          value={props.member.avatar || ''}
          onChange={(e) => {
            const value = e.currentTarget.value || null;
            const newMember = produce(props.member, (draft) => {
              draft.avatar = value;
            });
            props.onChange?.(newMember);
          }}
        />
        <FieldIconPreview
          allowYoutube
          className="rounded-full"
          url={props.member.avatar}
        />
      </div>
      <FieldHeader className="mb-1 mt-8">Role</FieldHeader>
      <Input
        className="w-full"
        placeholder="e.g. Chief Executive Officer"
        value={props.member.role || ''}
        onChange={(e) => {
          const value = e.currentTarget.value || null;
          const newMember = produce(props.member, (draft) => {
            draft.role = value;
          });
          props.onChange?.(newMember);
        }}
      />
      <FieldHeader className="mb-1 mt-8">Short Bio</FieldHeader>
      <FieldDescription>
        A bio of the team member helps build trust amongst community members and
        helps your project or organization stand out.
      </FieldDescription>
      <FieldRichTextEditor
        className="mt-2"
        document={props.member.description}
        placeholder="e.g. From an early age…"
        onDocumentChange={(document) => {
          const value = document ? (isEmpty(document) ? null : document) : null;
          const newMember = produce(props.member, (draft) => {
            draft.description = value;
          });
          props.onChange?.(newMember);
        }}
      />
      <FieldHeader className="mb-1 mt-8">Twitter</FieldHeader>
      <Input
        className="w-full"
        placeholder="e.g. @stevejobs"
        value={props.member.twitter || ''}
        onChange={(e) => {
          const value = e.currentTarget.value || null;
          const newMember = produce(props.member, (draft) => {
            draft.twitter = value;
          });
          props.onChange?.(newMember);
        }}
      />
    </div>
  );
}
