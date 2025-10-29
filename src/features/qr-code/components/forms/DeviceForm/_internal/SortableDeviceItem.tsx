import { FormCard } from '@/ui/fragments/form/FormCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton, Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  id: string
  canDelete: boolean
  onDelete: () => void
  children: ReactNode
}

export const SortableDeviceItem: FC<Props> = ({
  id,
  canDelete,
  onDelete,
  children
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FormCard
        cardProps={{
          sx: {
            p: 2,
            position: 'relative',
            overflow: 'visible',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing'
            }
          }
        }}
      >
        <div
          {...listeners}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <IconButton
          onClick={onDelete}
          color="error"
          disabled={!canDelete}
          size="small"
          sx={{
            position: 'absolute',
            top: -16,
            right: -16,
            zIndex: 2
          }}
        >
          <CancelIcon />
        </IconButton>
        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Stack>
      </FormCard>
    </div>
  )
}
