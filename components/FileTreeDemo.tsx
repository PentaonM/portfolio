import { File, Folder, Tree } from "@/components/ui/file-tree";

export default function FileTreeDemo() {
  return (
    <div className="flex h-[375px] w-5/12 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background max-lg:w-6/12 max-sm:mt-32 max-sm:w-full md:shadow-xl">
      <Tree
        className="overflow-hidden rounded-md bg-background p-5"
        initialSelectedId="8"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
        ]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element=".next">
            <File value="3">
              <p>...</p>
            </File>
          </Folder>
          <Folder value="4" element="app">
            <File value="5">
              <p>layout.tsx</p>
            </File>
            <File value="6">
              <p>page.tsx</p>
            </File>
            <File value="7">
              <p>globals.css</p>
            </File>
          </Folder>
          <Folder value="8" element="components">
            <Folder value="9" element="ui">
              <File value="10">
                <p>button.tsx</p>
              </File>
            </Folder>
            <File value="11">
              <p>header.tsx</p>
            </File>
            <File value="12">
              <p>footer.tsx</p>
            </File>
          </Folder>
          <Folder value="13" element="data">
            <File value="14">
              <p>...</p>
            </File>
          </Folder>
          <Folder value="15" element="lib">
            <File value="16">
              <p>utils.ts</p>
            </File>
          </Folder>
          <Folder value="17" element="public">
            <File value="18">
              <p>...</p>
            </File>
          </Folder>
          <File value="19">
            <p>.gitignore</p>
          </File>
          <File value="20">
            <p>next-env.d.ts</p>
          </File>
          <File value="21">
            <p>next.config.mjs</p>
          </File>
          <File value="22">
            <p>package-lock.json</p>
          </File>
          <File value="23">
            <p>package.json</p>
          </File>
          <File value="24">
            <p>README.md</p>
          </File>
          <File value="25">
            <p>tailwind.config.ts</p>
          </File>
          <File value="26">
            <p>tsconfig.json</p>
          </File>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: ".next",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "...",
          },
        ],
      },
      {
        id: "4",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "5",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "6",
            isSelectable: true,
            name: "page.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "globals.css",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "ui",
            children: [
              {
                id: "10",
                isSelectable: true,
                name: "button.tsx",
              },
            ],
          },
          {
            id: "11",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "12",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "13",
        isSelectable: true,
        name: "data",
        children: [
          {
            id: "14",
            isSelectable: true,
            name: "...",
          },
        ],
      },
      {
        id: "15",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "16",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
      {
        id: "17",
        isSelectable: true,
        name: "public",
        children: [
          {
            id: "18",
            isSelectable: true,
            name: "...",
          },
        ],
      },
      {
        id: "19",
        isSelectable: true,
        name: ".gitignore",
      },
      {
        id: "20",
        isSelectable: true,
        name: "next-env.d.ts",
      },
      {
        id: "21",
        isSelectable: true,
        name: "next.config.mjs",
      },
      {
        id: "22",
        isSelectable: true,
        name: "package-lock.json",
      },
      {
        id: "23",
        isSelectable: true,
        name: "package.json",
      },
      {
        id: "24",
        isSelectable: true,
        name: "README.md",
      },
      {
        id: "25",
        isSelectable: true,
        name: "tailwind.config.ts",
      },
      {
        id: "26",
        isSelectable: true,
        name: "tsconfig.json",
      },
    ],
  },
];
