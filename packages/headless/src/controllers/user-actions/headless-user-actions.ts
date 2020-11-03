import {Schema, SchemaValues, StringValue} from '@coveo/bueno';
import {Engine} from '../../app/headless-engine';
import {executeGetUserActions} from '../../features/user-profile/user-profile-actions';
import {buildController} from '../controller/headless-controller';
import {updateUserProfileConfiguration} from '../../features/configuration/configuration-actions';
import {UserActionsAppState} from '../../state/user-actions-app-state';

const optionsSchema = new Schema({
  /**
   * The userId of the user whos actions we want to retrieve.
   */
  userId: new StringValue({
    required: true,
    emptyAllowed: false,
  }),
});

export type UserActionsOptions = Required<SchemaValues<typeof optionsSchema>>;

export interface UserActionsProps {
  options: UserActionsOptions;
}

/**
 * A scoped and simplified part of the headless state that is relevant to the `UserActions` controller.
 */
export type UserActionsState = UserActions['state'];
/**
 * The `UserActions` headless controller offers a high-level interface for designing a user actions controller.
 */
export type UserActions = ReturnType<typeof buildUserActions>;

export function buildUserActions(
  engine: Engine<UserActionsAppState>,
  props: UserActionsProps
) {
  const controller = buildController(engine);
  const {dispatch} = engine;

  const options = optionsSchema.validate(props.options) as Required<
    UserActionsOptions
  >;

  dispatch(updateUserProfileConfiguration(options));
  dispatch(executeGetUserActions());

  return {
    ...controller,

    /**
     * Triggers a user actions fetch
     */
    update() {
      dispatch(executeGetUserActions());
    },

    /**
     * @returns The state of the `UserActions` controller.
     */
    get state() {
      const state = engine.state;
      return {
        ...state.userProfile,
      };
    },
  };
}
