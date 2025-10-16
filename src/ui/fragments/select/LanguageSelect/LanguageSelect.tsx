import { Language, LanguageKey } from '@/domains/valueObjects/language'
import {
  Autocomplete,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  TextField
} from '@mui/material'
import { FC, useState } from 'react'

type LanguageOption = {
  key: LanguageKey
  label: string
}

type Props = {
  language: Language
  onChange: (language: Language) => void
  isSidebarOpen?: boolean
}

export const LanguageSelect: FC<Props> = ({
  language,
  onChange,
  isSidebarOpen = true
}) => {
  const locale = language.locale
  const options = Language.getAllLanguages() as LanguageOption[]

  const currentOption =
    options.find((opt) => opt.key === language.value) || options[0]

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLanguageChange = (
    event: any,
    newValue: LanguageOption | null
  ) => {
    if (!newValue) return

    const result = Language.create(newValue.key)
    if (result.isFailure) return

    const newLanguage = result.language!
    onChange(newLanguage)
  }

  const handleFlagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setSearchQuery('')
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearchQuery('')
  }

  const handleOptionClick = (option: LanguageOption) => {
    const result = Language.create(option.key)
    if (result.isFailure) return

    onChange(result.language!)
    handleClose()
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // サイドバーが閉じている時は国旗アイコン + Popover
  if (!isSidebarOpen) {
    return (
      <>
        <IconButton
          onClick={handleFlagClick}
          sx={{
            fontSize: '1.8rem',
            width: 48,
            height: 48
          }}
        >
          {language.flag}
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <TextField
            size="small"
            placeholder={locale.word.select.language}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            sx={{ m: 1, width: 'calc(100% - 16px)' }}
          />
          <List sx={{ minWidth: 150, maxHeight: 200, overflow: 'auto' }}>
            {filteredOptions.map((option) => (
              <ListItemButton
                key={option.key}
                selected={option.key === language.value}
                onClick={() => handleOptionClick(option)}
              >
                <ListItemText
                  primary={`${Language.create(option.key).language!.flag} ${option.label}`}
                />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      </>
    )
  }

  return (
    <Autocomplete
      size="small"
      options={options}
      value={currentOption}
      onChange={handleLanguageChange}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      renderOption={(props, option) => {
        const optionLanguage = Language.create(option.key).language!
        return (
          <li {...props} key={option.key}>
            <span style={{ marginRight: 8 }}>{optionLanguage.flag}</span>
            {option.label}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField {...params} label={locale.word.select.language} />
      )}
      disableClearable
      slotProps={{
        paper: {
          sx: {
            minWidth: 200
          }
        }
      }}
    />
  )
}
