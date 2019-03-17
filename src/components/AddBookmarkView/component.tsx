import { Form, Input } from "antd"
import { FormComponentProps } from "antd/es/form"
import { BookmarksView } from "components/bookmarks-view/BookmarksView"
import { BookmarksNode } from "lib/trees"
import { WithCurrentTabProps } from "lib/with-current-tab"
import { createRef, PureComponent } from "react"
import { NewBookmarkData } from "state/bookmarks/data"
import styled from "styled-components"

export interface AddBookmarkViewProps extends WithCurrentTabProps {
  style?: {}
  className?: string
  addBookmark: (data: NewBookmarkData) => void
}

const AddBookmarkViewBase = styled.div``

export const AddBookmarkView: React.SFC<AddBookmarkViewProps> = ({
  style,
  className,
  addBookmark: saveBookmark,
  currentTab,
}) => (
  <AddBookmarkViewBase style={style} className={className}>
    <AddBookmarkForm
      data={{ title: currentTab.title, href: currentTab.url }}
      addBookmark={saveBookmark}
    />
  </AddBookmarkViewBase>
)

const StyledBookmarksView = styled(BookmarksView)`
  line-height: 1.5;
`

export interface AddBookmarkBaseFormProps {
  style?: {}
  className?: string
  data: Partial<NewBookmarkData>
  addBookmark: (data: NewBookmarkData) => void
}

class AddBookmarkBaseForm extends PureComponent<
  AddBookmarkBaseFormProps & FormComponentProps
> {
  protected titleInputHref = createRef<Input>()

  public componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
    if (this.titleInputHref.current) {
      this.titleInputHref.current.input.focus()
      this.titleInputHref.current.input.select()
    }
  }

  public render() {
    const { form, data = {} } = this.props
    const { getFieldDecorator, getFieldError, isFieldTouched } = form

    const titleError = isFieldTouched("title") && getFieldError("title")
    const hrefError = isFieldTouched("href") && getFieldError("href")

    return (
      <Form>
        <Form.Item
          validateStatus={hrefError ? "error" : "validating"}
          help={hrefError || ""}
        >
          {getFieldDecorator("href", {
            rules: [{ required: true, message: "Please enter a URL" }],
            initialValue: data.href,
          })(<Input placeholder="URL" />)}
        </Form.Item>

        <Form.Item
          validateStatus={titleError ? "error" : "validating"}
          help={titleError || ""}
        >
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please enter a title" }],
            initialValue: data.title,
          })(<Input placeholder="title" ref={this.titleInputHref} />)}
        </Form.Item>
        <Form.Item>
          <StyledBookmarksView onSelect={this.handleSubmit} />
        </Form.Item>
      </Form>
    )
  }

  protected handleSubmit = (node: BookmarksNode) => {
    this.props.form.validateFields(
      async (err, { href, title }: { href: string; title: string }) => {
        if (!err) {
          await this.props.addBookmark({ href, title, parentId: node.id })
          window.close()
        }
      },
    )
  }
}

export const AddBookmarkForm = Form.create({})(AddBookmarkBaseForm)
