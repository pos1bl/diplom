import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { GiftOption } from '@utils/Giftspage';
import useStore from '@hooks/useStore';
import { FC, useState } from 'react';
import { ContainedButton } from '@components/shared/ContainedButton';
import AuthService from '@services/AuthService';
import { observer } from 'mobx-react-lite';

interface Props {
  gift: GiftOption;
  onBack: () => void;
}

export const PurchaseForm: FC<Props> = observer(({ gift, onBack }) => {
  const { user, updateUserInfo } = useStore();
  const [showActivationPrompt, setShowActivationPrompt] = useState(false);
  
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: user.email || '',
      to: '',
      from: '',
      message: ''
    },
    onSubmit: async ({ value }) => {
      const updatedUser = await updateUserInfo();

      if (!updatedUser?.isActivated) {
        return setShowActivationPrompt(true);
      }
      
      console.log('Sending gift cert with data:', value);
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={6}
      >
        {/* Ліва частина: форма */}
        <Box flex={1}>
          <Typography variant="h6" color="primary" fontWeight={600} mb={2}>
            Будь ласка, заповни дані для купівлі сертифікату
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
          <Field
            name="email"
            // validators={{ onSubmit: () => !user.isActivated && 'Підтвердіть свою електронну адресу, щоб завершити покупку.' }}
          >
            {(field) => (
              <Box>
                <TextField
                  label="Твій email"
                  type="email"
                  fullWidth
                  disabled
                  value={field.state.value}
                  error={!!field.state.meta.errors.length || showActivationPrompt}
                  helperText={field.state.meta.errors[0] || showActivationPrompt && 'Підтвердіть свою електронну адресу, щоб завершити покупку.'}
                />

                {showActivationPrompt && (
                  <Box mt={1} display="flex" gap={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      Не прийшов лист?
                    </Typography>
                    <Button
                      size="small"
                      sx={{ textTransform: 'none', color: '#AC98D1', fontWeight: 500, p: 0, minWidth: 'fit-content' }}
                      onClick={async () => {
                        try {
                          await AuthService.resendActivation(user.email);
                          setShowActivationPrompt(false);
                        } catch (e) {
                        }
                      }}
                    >
                      Надіслати ще раз
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Field>

            <Field
              name="to"
              validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
            >
              {(field) => (
                <TextField
                  label="Для кого"
                  fullWidth
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              )}
            </Field>

            <Field
              name="from"
              validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
            >
              {(field) => (
                <TextField
                  label="Від кого"
                  fullWidth
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              )}
            </Field>

            <Field name="message">
              {(field) => (
                <TextField
                  label="Побажання, яке хочеш вписати у сертифікаті"
                  fullWidth
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 500 }}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  helperText={`${field.state.value.length}/500`}
                />
              )}
            </Field>

            <Divider />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                До сплати:
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {gift.amount * 1000 - (gift.amount * 1000 * gift.discount) / 100} грн
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Для вашої економії, списання відбувається у EUR 💶
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="outlined"
                onClick={onBack}
                sx={{ borderRadius: 5, px: 3 }}
              >
                Назад
              </Button>
              <Subscribe
                selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
              >
                 {([canSubmit, isSubmitting]) => (
                  <ContainedButton
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? 'Обробка...' : 'Оплатити'}
                  </ContainedButton>
                )}
              </Subscribe>
            </Box>
          </Box>
        </Box>

        {/* Права частина: превʼю */}
        <Box flex={1} display="flex" justifyContent="center" mt={{ xs: 4, md: 0 }}>
          <img
            src="/images/gift-preview.png"
            alt="Приклад сертифікату"
            width="100%"
            style={{ maxWidth: '400px', borderRadius: '12px' }}
          />
        </Box>
      </Box>
    </form>
  );
});
